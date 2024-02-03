Feature: Deve retornar uma lista de produtos por categoria

  Scenario: Deve retornar uma lista com um produto vinculado a categoria "Lanche"
    Given inicio a obtenção do lista passando o id 1 da categoria Lanche
    Then o resultado deve ser de sucesso ao obter a lista de produtos
    And a lista deve retornar com 1 produto

  Scenario: Não deve retornar uma lista de produtos ao passar uma categoria sem produtos vinculados
    Given inicio a obtenção do lista passando o id 2 da categoria Acompanhamento sem produtos vinculados
    Then o resultado deve ser de erro ao tentar obter a lista de produtos
    And o erro deve conter a mensagem "Products not found for informed category!"

  Scenario: Não deve retornar uma lista de produtos ao passar uma categoria não registrada
    Given inicio a obtenção do lista passando o id 1524 qualquer não registrado
    Then o resultado deve ser de erro ao tentar obter a lista de produtos com uma categoria inválida
    And o erro deve conter a mensagem "Product category not found!"
