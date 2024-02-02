Feature: Deve criar uma categoria para produtos

  Scenario: Deve criar uma categoria passando dados válidos
    Given chamo o método de criar pedido passando uma categoria válida
    Then o resultado deve ser de sucesso ao criar uma categoria
    And deve retornar a categoria criada

  Scenario: Não deve criar uma categoria ao passar dados inválidos
    Given chamo o método de criar pedido passando uma categoria válida com um campo inválido
    Then o resultado deve ser de erro do tipo 'ValidationError' ao tentar criar uma categoria
    And não deve retornar nenhuma categoria
