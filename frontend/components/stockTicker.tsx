import { useEffect } from 'react'

export const StockTicker = () => {
	useEffect(() => {
		const script = document.createElement("script")
		script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
		script.async = true
		script.innerHTML = JSON.stringify({
			"symbols": [
				{
					"proName": "FOREXCOM:SPXUSD",
					"title": "S&P 500"
				},
				{
					"proName": "FOREXCOM:NSXUSD",
					"title": "US 100"
				},
				{
					"proName": "FX_IDC:EURUSD",
					"title": "EUR/USD"
				},
				{
					"description": "USD/JPY",
					"proName": "FX:USDJPY"
				},
				{
					"description": "FFR",
					"proName": "FRED:FEDFUNDS"
				},
				{
					"description": "AAPL",
					"proName": "NASDAQ:AAPL"
				},
				{
					"description": "MSFT",
					"proName": "NASDAQ:MSFT"
				},
				{
					"description": "GOOG",
					"proName": "NASDAQ:GOOG"
				},
				{
					"description": "NKE",
					"proName": "NYSE:NKE"
				},
				{
					"description": "INTC",
					"proName": "NASDAQ:INTC"
				},
				{
					"description": "AMD",
					"proName": "NASDAQ:AMD"
				},
				{
					"description": "NVDA",
					"proName": "NASDAQ:NVDA"
				},
				{
					"description": "AMZN",
					"proName": "NASDAQ:AMZN"
				},
				{
					"description": "META",
					"proName": "NASDAQ:META"
				},
				{
					"description": "ADBE",
					"proName": "NASDAQ:ADBE"
				}
			],
			"showSymbolLogo": true,
			"colorTheme": "light",
			"isTransparent": true,
			"displayMode": "regular",
			"locale": "en"
		})

		let tickerContainer = document.getElementsByClassName("tradingview-widget-container__widget")[0]
		if (tickerContainer.childElementCount === 0) {
			tickerContainer.appendChild(script)
		}
	}, [])

	return (
		<div className="tradingview-widget-container">
			<div className="tradingview-widget-container__widget"></div>
		</div>
	)
}