import '@/styles/main.scss'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'

import { Header } from '@/components/header'
import { SideNav } from '@/components/sideNav'

export default function App({ Component, pageProps }: AppProps) {
  const [headerHeight, setHeaderHeight] = useState("1.5em");

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      if (window.innerWidth < 900) {
        setHeaderHeight("1.5em");
      } else if (window.innerWidth < 1300) {
        setHeaderHeight(`calc(${header.offsetHeight}px + 1.5em)`);
      } else {
        setHeaderHeight(`calc(${header.offsetHeight}px + 2em)`);
      }
    }

    function handleResize() {
      if (header) {
        if (window.innerWidth < 900) {
          setHeaderHeight("1.5em");
        } else if (window.innerWidth < 1300) {
          setHeaderHeight(`calc(${header.offsetHeight}px + 1.5em)`);
        } else {
          setHeaderHeight(`calc(${header.offsetHeight}px + 2em)`);
        }
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
			<SideNav/>
      <div>
        <Header/>
        <div style={{ marginTop: headerHeight }}>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}