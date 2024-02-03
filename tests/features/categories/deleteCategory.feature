Feature: Deve remover uma categoria para produtos

  Scenario: Deve remover uma categoria passando um id válido
    Given inicio a remoção da categoria passando o id 1 como parametro
    Then o resultado deve ser de sucesso ao remover uma categoria

  Scenario: Não deve remover uma categoria ao passar um id inválido
    Given inicio a remoção da categoria passando o id 'abcde' como parametro
    Then o resultado deve ser de erro ao tentar remover uma categoria
    And a mensagem de erro deve ser 'The id must be numeric'

  Scenario: Não deve remover uma categoria ao passar um id de uma categoria com produtos vinculados
    Given inicio a remoção da categoria passando o id 2 como parametro
    Then o resultado deve ser de erro ao tentar remover uma categoria
    And a mensagem de erro deve ser 'The category is in use and cannot be deleted'
