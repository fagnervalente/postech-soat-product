Feature: Deve retornar produtos

  Scenario: Deve retornar o produto desejado passando um ID existente
    Given inicio a obtenção do produto passando o id 1 como parametro
    Then o resultado deve ser de sucesso
    And deve retornar 1 item

  Scenario: Não deve retornar o pedido da fila passando um ID inexistente
    Given inicio a obtenção do produto passando o id 1524 como parametro
    Then o resultado deve ser de erro
    And deve retornar a mensagem de erro 'Product not found!'
