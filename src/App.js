import {
	Card,
	CardContent,
	FormControl,
	MenuItem,
	Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import "./Components/InfoBox/InfoBox";
import InfoBox from "./Components/InfoBox/InfoBox";
import Map from "./Components/Map/Map";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});

	// Get all countries
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	// Get a single country
	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));

					setCountries(countries);
				});
		};

		getCountriesData();
	}, []);

	// Functions
	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode);

		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);
			});
	};

	console.log("country info", countryInfo);

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app_dropdown">
						<Select
							variant="outlined"
							value={country}
							onChange={onCountryChange}
						>
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className="app__stats">
					<InfoBox
						title="Coronavirus cases"
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						title="Recovered"
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title="Deaths"
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>

				<Map />
			</div>

			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<h3>Worldwide new cases</h3>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
