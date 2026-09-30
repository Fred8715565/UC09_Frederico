import random

numero_secreto = random.randint(1, 1000)
num_tentativas = 0

print("Seja bem-vindo ao jogo do número secreto!")
print("Tente adivinhar o número entre 1 e 1000.")

while True:
    palpite = int(input("Digite seu palpite: ")) 
    num_tentativas += 1
    if palpite == numero_secreto:
        print(f"Acertou! Miserávi! Você precisou de {num_tentativas} tentativas.")
        break 
    elif palpite > numero_secreto:
        print("O número secreto é menor que o seu palpite.")
    else:
        print("O número secreto é maior que o seu palpite.")
