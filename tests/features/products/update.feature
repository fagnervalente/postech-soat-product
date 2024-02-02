Feature: Deve atualizar produtos

  Scenario: Deve atualizar o produto desejado passando um ID existente
    Given inicio a atualização do produto passando o id 1 como parametro
    Then o resultado não deve retornar erros ao atualizar o produto

  Scenario: Não deve atualizar um produto desejado passando um ID inexistente
    Given inicio a atualização do produto passando o id 1524 como parametro
    Then o resultado deve ser de erro ao atualizar o produto
    And deve retornar a mensagem de erro 'Product not found!' ao tentar atualizar o produto

  Scenario: Não deve atualizar um produto desejado passando um ID de categoria inexistente
    Given inicio a atualização do produto passando um produto válido, mas com um ID 4251 de categoria inválida como parametro
    Then o resultado deve ser de erro ao tentar atualizar o produto com uma categoria não encontrada
    And deve retornar a mensagem de erro 'Product category not found!' ao tentar atualizar o produto com uma categoria inexistente
