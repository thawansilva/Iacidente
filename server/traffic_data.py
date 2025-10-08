import sqlite3

LIST_REGION = {
    "todas": ["AC", "AP", "AM", "PA", "RR", "RO", "TO", "AL", "BA", "CE", \
            "MA", "PB", "PI", "PE", "RN", "SE", "ES", "MG", "RJ", "SP", "PR", \
            "RS", "SC", "DF", "GO", "MS", "MT"],
    "norte": ["AC", "AP", "AM","PA", "RR","RO","TO"],
    "nordeste": ["AL", "BA", "CE", "MA", "PB", "PI", "PE", "RN", "SE"],
    "sudeste": ["ES", "MG", "RJ", "SP"],
    "sul": ["PR", "RS", "SC"],
    "centro-oeste": ["DF", "GO", "MS", "MT"]
}
                     
def get_acidents_data(year, state_placeholders, state_value, state):
    """ Get information about the accidents """
    con = sqlite3.connect(f"../database/{year}.db")
    cur = con.cursor()
    quant_acidents = cur.execute('SELECT COUNT(*) FROM data WHERE uf IN \
            ({})'.format(state_placeholders), state_value).fetchone()[0]
    
    acidents_causes = cur.execute("SELECT DISTINCT causa_acidente,\
            COUNT(causa_acidente) as quantidade FROM data WHERE uf IN ({}) \
            GROUP BY causa_acidente ORDER BY quantidade \
            DESC".format(state_placeholders), state_value).fetchall()
    
    acidents_category = cur.execute("SELECT DISTINCT \
            classificacao_acidente, COUNT(causa_acidente) as quantidade \
            FROM data WHERE uf IN ({}) GROUP BY classificacao_acidente \
            ORDER BY quantidade DESC".format(state_placeholders), state_value).fetchall()

    moment_day = cur.execute("SELECT DISTINCT fase_dia, \
            COUNT(fase_dia) as quantidade FROM data WHERE uf IN ({}) GROUP BY \
            fase_dia ORDER BY quantidade \
            DESC".format(state_placeholders), state_value).fetchone()
    
    weather_condition = cur.execute("SELECT DISTINCT condicao_metereologica, \
            COUNT(condicao_metereologica) as quantidade FROM data WHERE uf \
            IN ({}) GROUP BY condicao_metereologica ORDER BY quantidade \
            DESC".format(state_placeholders), state_value).fetchone()
    
    acident_zone = cur.execute("SELECT DISTINCT uso_solo, COUNT(uso_solo)\
            as quantidade FROM data WHERE uf IN ({}) GROUP BY uso_solo \
            ORDER BY quantidade DESC".format(state_placeholders), state_value).fetchone()

    acidents_data = {"quant_acidents": quant_acidents, "causes": acidents_causes, \
            "classification": acidents_category, "moment_day": moment_day, \
            "weather_condition": weather_condition, "acident_zone": acident_zone}

    if state != 'todos':
        cities = cur.execute("SELECT DISTINCT municipio, COUNT(municipio) \
                as quantidade FROM data WHERE uf = ? GROUP BY municipio \
                ORDER BY quantidade DESC", (state, )).fetchall()
        acidents_data['cities'] = cities
    else: 
        states = cur.execute("SELECT DISTINCT uf, COUNT(uf) as quantidade \
                FROM data WHERE uf IN ({}) GROUP BY uf ORDER BY quantidade \
                DESC".format(state_placeholders), state_value).fetchall()    
        acidents_data['states'] = states

    # Database older then 2017 doesn't has latitude and longitude data
    if int(year) > 2016:
        coordenates = cur.execute("SELECT latitude, longitude FROM data \
                WHERE uf IN ({})".format(state_placeholders), state_value).fetchall()       
        acidents_data['coordenates'] = coordenates 
    return acidents_data

def get_traffic_data(year = '2024', region = 'todas', state = None):
    """ Get information about the road's traffic' """
    state = state or 'todos'
    filtered_region = LIST_REGION[region]

    state_placeholders = '?' if state != "todos" else ', '.join(["?"]*len(filtered_region))
        
    state_value = tuple(filtered_region) if state == "todos"  else (state, )
    
    acidents_data = get_acidents_data(year, state_placeholders, state_value, state)

    acidents_data['year'] = int(year)
    
    return acidents_data
