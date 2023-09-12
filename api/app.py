from flask import Flask
import pygsheets
from datetime import datetime

app = Flask(__name__)
# Permite que o JSON retornado não seja em ASCII, mas sim em UTF-8
app.json.ensure_ascii = False

# Google Client
gc = pygsheets.authorize(service_file='jurifin-dashboard-pygsheets-b0525e232b03.json')
# Google Spreadsheet
sh = gc.open('FGV Jr. 2023.02 - Planilha Financeira - Cópia Alterada')

nomes_meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]

@app.route("/<area>/<int:data_inicio>/<int:data_fim>")
def index(area, data_inicio, data_fim):
    lancamentos = get_lancamentos(data_inicio, data_fim) if area == "Geral" else get_lancamentos_area(area, data_inicio, data_fim)

    porcentagel_utilizado = get_porcentagem_utilizado_geral() if area == "Geral" else get_porcentagem_utilizado(area)

    dados = {
        'entradas_saidas_saldo': get_entradas_saidas_saldo(),
        'orcado_utilizado': get_orcado_utilizado(),
        'inadimplencia': get_inadimplencia(),
        'lancamentos': lancamentos,
        'porcentagem_utilizado': porcentagel_utilizado,
        'atual_meta': get_atual_meta()
    }
    return dados

def get_coluna(
        wks,
        i,
        returnas='matrix',
        include_tailing_empty=False,
        include_empty=False,
        value_render=pygsheets.ValueRenderOption.UNFORMATTED_VALUE
    ):
    return wks.get_col(
        i,
        returnas=returnas,
        include_tailing_empty=include_tailing_empty,
        include_empty=include_empty,
        value_render=value_render
    )

def get_linha(
        wks,
        i,
        returnas='matrix',
        include_tailing_empty=False,
        include_empty=False,
        value_render=pygsheets.ValueRenderOption.UNFORMATTED_VALUE
    ):
    return wks.get_row(
        i,
        returnas=returnas,
        include_tailing_empty=include_tailing_empty,
        include_empty=include_empty,
        value_render=value_render
    )

def get_entradas_saidas_saldo():
    wks = sh.worksheet_by_title('FLUXO DE CAIXA')

    # Pega as últimas células com valores na coluna B
    entradas, saidas, saldo = get_coluna(wks, 2)[-3:]

    retorno = {
        'entradas': entradas,
        'saidas': saidas,
        'saldo': saldo
    }

    return retorno

def get_orcado_utilizado():
    wks = sh.worksheet_by_title('ORÇAMENTO ')

    # Pega as últimas células com valores na colunas C, D e E
    area = get_coluna(wks, 3)[-8:-1]
    orcamento = get_coluna(wks, 4)[-8:-1]
    utilizado = get_coluna(wks, 5)[-8:-1]
    
    retorno = {}

    for i in range(len(area)):
        retorno[area[i]] = {
            'Orçamento': orcamento[i],
            'Utilizado': utilizado[i]
        }

    return retorno

def get_inadimplencia():
    wks = sh.worksheet_by_title('CONTROLE DE INADIMPLÊNCIA')

    # Pega a última célula com valor na coluna B
    inadimplencia = get_coluna(wks, 2)[-1]

    porcentagem = get_linha(wks, 7)[-1]

    retorno = {
        'inadimplencia': inadimplencia,
        'porcentagem': porcentagem
    }

    return retorno

def serial_number_to_date(serial_number):
    return datetime.fromordinal(datetime(1900, 1, 1).toordinal() + serial_number - 2)

def get_lancamentos_area(area, data_inicio, data_fim, data_string=True, n=3):
    wks = sh.worksheet_by_title('LANÇAMENTOS')

    datas = get_coluna(wks, 1)
    origens = get_coluna(wks, 6)
    areas = get_coluna(wks, 9)
    lancamentos = get_coluna(wks, 10)

    retorno = []

    for i in range(len(areas) - 1, -1, -1):
        if type(datas[i]) == str:
            break
        if datas[i] >= data_inicio and datas[i] <= data_fim and areas[i] == area:
            data = serial_number_to_date(datas[i]).strftime('%d/%m/%Y') if data_string else datas[i]

            retorno.append({
                'Data': data,
                'Origem': origens[i],
                'Lançamento': lancamentos[i]
            })

            n -= 1
            if n <= 0:
                break

    return retorno

def get_porcentagem_utilizado(area):
    wks = sh.worksheet_by_title('ORÇAMENTO ')

    # Pega as últimas células com valores na colunas C e F
    areas = get_coluna(wks, 3)
    porc_orcado = get_coluna(wks, 6)
    
    for i in range(len(areas) - 1, -1, -1):
        if areas[i] == area:
            return porc_orcado[i]

def get_atual_meta():
    wks_fluxo = sh.worksheet_by_title('FLUXO DE CAIXA')
    wks_inadimplencia = sh.worksheet_by_title('CONTROLE DE INADIMPLÊNCIA')

    # Encontra a linha com o SALDO FINAL
    linha_saldo_final = get_coluna(wks_fluxo, 1).index('SALDO FINAL') + 1
    saldos_finais = get_linha(wks_fluxo, linha_saldo_final, returnas='cell')
    meses = get_linha(wks_fluxo, 2)

    saldos = {}

    for i in range(2, len(saldos_finais)):
        if meses[i] > 6:
            if saldos_finais[i].value == ' R$  -   ':
                break
            mes_anterior = nomes_meses[meses[i] - 2]
            saldo_anterior = saldos[mes_anterior] if mes_anterior in saldos else 0
            
            mes_atual = nomes_meses[meses[i] - 1]
            saldos[mes_atual] = saldo_anterior + saldos_finais[i].value_unformatted
    
    meta = get_linha(wks_inadimplencia, 4)[-2]
    metas_mensais = {}
    incremento = meta / 6
    meta_mensal = incremento

    for i in range(6, 12):
        mes = nomes_meses[i]
        metas_mensais[mes] = meta_mensal
        meta_mensal += incremento
    
    retorno = {
        'saldos': saldos,
        'metas_mensais': metas_mensais
    }

    return retorno

def get_lancamentos(data_inicio, data_fim, data_string=True, n=3):
    wks = sh.worksheet_by_title('LANÇAMENTOS')

    datas = get_coluna(wks, 1)
    origens = get_coluna(wks, 6)
    areas = get_coluna(wks, 9)
    lancamentos = get_coluna(wks, 10)

    retorno = []

    for i in range(len(areas) - 1, -1, -1):
        if type(datas[i]) == str:
            break
        if datas[i] >= data_inicio and datas[i] <= data_fim:
            data = serial_number_to_date(datas[i]).strftime('%d/%m/%Y') if data_string else datas[i]

            retorno.append({
                'Data': data,
                'Origem': origens[i],
                'Área': areas[i],
                'Lançamento': lancamentos[i]
            })

            n -= 1
            if n <= 0:
                break

    return retorno

def get_porcentagem_utilizado_geral():
    wks = sh.worksheet_by_title('ORÇAMENTO ')

    # Pega as últimas células com valores na colunas C e F
    orcado = get_coluna(wks, 4)[-1]
    utilizado = get_coluna(wks, 5)[-1]
    
    return utilizado / orcado