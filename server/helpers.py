import sqlite3

LIST_REGION = {
    "todas": ["AC", "AP", "AM", "PA", "RR", "RO", "TO", "AL", "BA", "CE", "MA", "PB", "PI", "PE", "RN", "SE", "ES", "MG", "RJ", "SP", "PR", "RS", "SC", "DF", "GO", "MS", "MT"],
    "norte": ["AC", "AP", "AM","PA", "RR","RO","TO"],
    "nordeste": ["AL", "BA", "CE", "MA", "PB", "PI", "PE", "RN", "SE"],
    "sudeste": ["ES", "MG", "RJ", "SP"],
    "sul": ["PR", "RS", "SC"],
    "centro-oeste": ["DF", "GO", "MS", "MT"]
}
                     
def getTrafficData(year = '2024', region = 'todas', state = None):
    con = sqlite3.connect(f"../database/{year}.db")
    cur = con.cursor()
    state = state or 'todos'
    filteredRegion = LIST_REGION[region]

    placeholders = '?' if state != "todos" else ', '.join(["?"]*len(filteredRegion))
        
    stateValue = tuple(filteredRegion) if state == "todos"  else (state, )
    
    quantAcidents = cur.execute('SELECT COUNT(*) FROM data WHERE uf IN ({})'.format(placeholders), stateValue).fetchone()[0]
    
    acidentsCauses = cur.execute("SELECT DISTINCT causa_acidente, COUNT(causa_acidente) as quantidade FROM data WHERE uf IN ({}) GROUP BY causa_acidente ORDER BY quantidade DESC".format(placeholders), stateValue).fetchall()
    
    acidentsClassification = cur.execute("SELECT DISTINCT classificacao_acidente, COUNT(causa_acidente) as quantidade FROM data WHERE uf IN ({}) GROUP BY classificacao_acidente ORDER BY quantidade DESC".format(placeholders), stateValue).fetchall()

    momentDay = cur.execute("SELECT DISTINCT fase_dia, COUNT(fase_dia) as quantidade FROM data WHERE uf IN ({}) GROUP BY fase_dia ORDER BY quantidade DESC".format(placeholders), stateValue).fetchone()
    
    weatherCondition = cur.execute("SELECT DISTINCT condicao_metereologica, COUNT(condicao_metereologica) as quantidade FROM data WHERE uf IN ({}) GROUP BY condicao_metereologica ORDER BY quantidade DESC".format(placeholders), stateValue).fetchone()
    
    acidentZone = cur.execute("SELECT DISTINCT uso_solo, COUNT(uso_solo) as quantidade FROM data WHERE uf IN ({}) GROUP BY uso_solo ORDER BY quantidade DESC".format(placeholders), stateValue).fetchone()

    acidents_data = {"quant_acidents": quantAcidents, "causes": acidentsCauses, "classification": acidentsClassification, "momentDay": momentDay, "weatherCondition": weatherCondition, "acidentZone": acidentZone, "year": int(year) }

    if state != 'todos':
        cities = cur.execute("SELECT DISTINCT municipio, COUNT(municipio) as quantidade FROM data WHERE uf = ? GROUP BY municipio ORDER BY quantidade DESC", (state, )).fetchall()
        acidents_data['cities'] = cities
    else: 
        states = cur.execute("SELECT DISTINCT uf, COUNT(uf) as quantidade FROM data WHERE uf IN ({}) GROUP BY uf ORDER BY quantidade DESC".format(placeholders), stateValue).fetchall()    
        acidents_data['states'] = states

    # Database older then 2017 doesn't has latitude and longitude data
    if int(year) > 2016:
        coordenates = cur.execute("SELECT latitude, longitude FROM data WHERE uf IN ({})".format(placeholders), stateValue).fetchall()       
        acidents_data['coordenates'] = coordenates 
        return acidents_data
    
    return acidents_data