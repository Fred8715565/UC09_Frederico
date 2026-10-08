import numpy as np
import pandas as pd
from pathlib import Path

def gerar_vendas_massa(quantidade=1000, nome_arquivo="vendas.xlsx"):
    # Caminho dinâmico para a Área de Trabalho
    caminho_desktop = Path.home() / "Desktop"
    if not caminho_desktop.exists():
        caminho_desktop = Path.home() / "OneDrive" / "Desktop"
    caminho_completo = caminho_desktop / nome_arquivo
    # Listas base de nomes e sobrenomes
    primeiros_nomes = [
        "Ana", "Bruno", "Carlos", "Daniela", "Eduardo",
        "Fernanda", "Gabriel", "Helena", "Igor", "Juliana",
        "Lucas", "Mariana", "Otávio", "Patricia", "Rafael"
    ]
    sobrenomes = [
        "Silva", "Santos", "Oliveira", "Souza", "Lima",
        "Ferreira", "Costa", "Pereira", "Almeida", "Ribeiro",
        "Carvalho", "Gomes", "Martins", "Araújo"
    ]
    # Gerando os registros
    clientes = [
        f"{np.random.choice(primeiros_nomes)} {np.random.choice(sobrenomes)}"
        for _ in range(quantidade)
    ]
    valores = np.round(
        np.random.uniform(20.0, 500.0, size=quantidade),
        2
    )
    status = np.where(
        valores > 100,
        "Alto Valor",
        "Padrão"
    )
    # Criação do DataFrame
    df_novos = pd.DataFrame({
        "Cliente": clientes,
        "Valor": valores,
        "Status": status
    })
    # Carrega planilha existente ou cria uma nova
    try:
        df_existente = pd.read_excel(caminho_completo)
        df_final = pd.concat(
            [df_existente, df_novos],
            ignore_index=True
        )
    except FileNotFoundError:
        df_final = df_novos
    # Salva na Área de Trabalho
    df_final.to_excel(
        caminho_completo,
        index=False
    )
    print(
        f"Sucesso! {quantidade} registros foram adicionados "
        f"e salvos em:\n{caminho_completo}"
    )
# Executa para gerar 1000 registros
gerar_vendas_massa(1000)