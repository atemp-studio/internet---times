import Link from 'next/link'

export const SideNav = () => {
	return (
		<aside>
			<ul>
				<li><Link href="/about">About</Link></li>
				<li>
					<Link href="/">Entries</Link>
					<ul>
						<li><Link href="/interviews">Interviews</Link></li>
						<li><Link href="/art">Art</Link></li>
						<li><Link href="/design">Design</Link></li>
						<li><Link href="/music">Music</Link></li>
						<li><Link href="/culture">Culture</Link></li>
						<li><Link href="/friends">Friends</Link></li>
					</ul>
				</li>
				<li><Link href="/analytics">Analytics</Link></li>
				<li><Link href="/mit">MIT</Link></li>
				<li><Link href="/snail-mail">Snail Mail</Link></li>
			</ul>
		</aside>
	)
}