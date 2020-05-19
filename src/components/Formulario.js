import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import Error from "./Error";

import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

const Boton = styled.input`
	margin-top: 20px;
	font-weight: bold;
	color: #FFF;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	transition: background-color .3s ease;

	&:hover{
		background-color: #326AC0;
		cursor: pointer;
	}

`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
	const [listacripto, guardarCriptomonedas] = useState([]);

	const MONEDAS = [
		{ codigo: "USD", nombre: "Dolar de Estados Unidos" },
		{ codigo: "MXN", nombre: "Peso Mexicano" },
		{ codigo: "EUR", nombre: "Euro" },
	];

	// utilizar useMoneda

	const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

	// utilizar criptomoneda
	const [criptomoneda, SelectCripto] = useCriptomoneda(
		"Elige tu Criptomoneda",
		"",
		listacripto
	);

	const [error, guardarError] = useState(false);

	// Ejecutar llamado Api
	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
			const resultado = await axios.get(url);

			guardarCriptomonedas(resultado.data.Data);
		};
		consultarAPI();
	}, []);

	const cotizarMoneda = (e) => {
		e.preventDefault();

		if (moneda.trim() === "" || criptomoneda.trim() === "") {
			guardarError(true);
			return;
		}

		guardarError(false);
		guardarMoneda(moneda);
		guardarCriptomoneda(criptomoneda);
	};

	return (
		<form onSubmit={cotizarMoneda}>
			{error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
			<SelectMonedas />
			<SelectCripto />

			<Boton type="submit" value="Calcular" />
		</form>
	);
};

export default Formulario;
