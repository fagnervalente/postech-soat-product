Feature: Deve atualizar uma categoria para produtos

  Scenario: Deve atualizar uma categoria passando um id válido
    Given inicio a atualização da categoria passando o id 1 como parametro
    Then o resultado deve ser de sucesso ao atualizar uma categoria

  Scenario: Não deve atualizar uma categoria ao passar um id inválido
    Given inicio a atualização da categoria passando o id 1524 como parametro
    Then o resultado deve ser de erro ao tentar atualizar uma categoria
