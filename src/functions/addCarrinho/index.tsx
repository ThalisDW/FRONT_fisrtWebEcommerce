import { useEffect, useState } from "react";

interface IProdutos {
    id_produto: string;
    nome: string;
    valor: string;
    descricao: string;
    url_foto: string;
    categoria: string;
}

export default function addCarrinho (item: IProdutos){

    interface ItemCarrinho {
        id_produto: string;
        nome: string;
        valor: string;
        descricao: string;
        url_foto: string;
        categoria: string;
        quantidade: number;
      }

      let carrinho:ItemCarrinho[] = [];

      
      const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho') || '[]');
      carrinho = carrinhoSalvo;

      const novoCarrinho = [...carrinho];

      const index = novoCarrinho.findIndex((i) => Number(i.id_produto) == Number(item.id_produto));
      
    if (index !== -1) {
      // Item já existe no carrinho, aumentar a quantidade
      novoCarrinho[index].quantidade += 1;
    } else {
      // Adicionar novo item ao carrinho
      novoCarrinho.push({ ...item, quantidade: 1 });
    }

    carrinho = novoCarrinho;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}