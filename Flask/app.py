from flask import Flask
import pygsheets
from pygsheets import ValueRenderOption

app = Flask(__name__)
gc = pygsheets.authorize(service_file='jurifin-dashboard-pygsheets-b0525e232b03.json')
sh = gc.open('FGV Jr. 2023.02 - Planilha Financeira - Cópia Alterada')

@app.route("/")
def index():
    return get_entradas_saidas_saldo()

def get_entradas_saidas_saldo():
    wks = sh.worksheet_by_title('FLUXO DE CAIXA')

    # Pega as últimas células com valores na coluna B
    entradas, saidas, saldo = wks.get_col(2, returnas='matrix', include_tailing_empty=False, include_empty=False, value_render=ValueRenderOption.UNFORMATTED_VALUE)[-3:]

    retorno = {
        'entradas': entradas,
        'saidas': saidas,
        'saldo': saldo
    }

    return retorno