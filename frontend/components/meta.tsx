import Head from 'next/head';
import { NextPage } from "next";

interface Props {
	title: string;
	description: string;
	ogType: string;
	ogSlug: string;
	ogImageURL: string;
}

export const Meta: NextPage<Props> = ({ title, description, ogType, ogSlug, ogImageURL }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description}/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="language" content="en"/>
			<meta name="robots" content="index,follow"/>
			<meta name="og:title" content={title}/>
			<meta name="og:type" content={ogType}/>
			<meta name="og:url" content={ogSlug == "" ? "https://internet---times.com" : `https://internet---times.com/${ogSlug}`}/>
			<meta name="og:site_name" content="The Internet Times"/>
			<meta name="og:description" content={description}/>
			<meta name="og:image" content={ogImageURL}/>
		</Head>
	)
}