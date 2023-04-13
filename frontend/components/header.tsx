import Image from 'next/image'
import Link from 'next/link'
import Wordmark from '../static/The_Internet_Times_Jpeg_Distortion_Wordmark.jpg'
import LVMHPublishing from '../static/LVMH_Publishing.jpg'
import { StockTicker } from './stockTicker'

export const Header = () => {
	return (
		<header>
			<StockTicker/>

			<div id="main-header">
				<div id="site-info">
					<Link href="/">
						<p>HTTPS://INTERNET---TIMES.COM</p>
					</Link>
					<p>
						We’re really internet and we’re here to stay.
						A website about things <a href="https://marx.sh">Will</a> & <a href="https://www.sebastianlogue.xyz/">Seb</a> and various friends & guests think are interesting.
						Little-to-no specific focus, a bit odd, speling errors, and incredibly culturally relevant.
						Not the first nor the last. Why copy when you can steal?
					</p>
				</div>

				<Link href="/">
					<Image id="wordmark" src={Wordmark} alt="The Internet Times"/>
				</Link>

				<p id="slogan">
					From our servers worldwide to your browser, enjoy tomorrow’s news today.
				</p>

				<a href="https://lvmh.pub">
					<Image id="lvmh-publishing" src={LVMHPublishing} alt="LVMH Publishing"/>
				</a>

				<a href="https://www.weather.gov/">
					<img id="weather" src="https://wttr.in/_0tpq_I_background=c0c0c0_transparency=255.png" alt="Weather"/>
				</a>
			</div>

			<div id="mobile-subheader">
				<p>
					“Real readers use a laptop.”
				</p>
			</div>

			<hr/>
		</header>
	)
}
