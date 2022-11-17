import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import AppStart from "./api/app";
import { BasciConnect } from '../components/ConnectWallet';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import { Twitter, GitHub,DescriptionOutlined } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

const Home: NextPage = () => {
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  
  return (
    <section className="bg-gray-900 text-white">
       <div className="justify-right">
        
          {/* Pill */}
          <a className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75" href="/posts/fist-post">
            <span className="block rounded-full px-8 py-3 text-sm font-medium hover:bg-transparent">
              enter yalpApp
            </span>
          </a>
        </div>
        
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Welcome to <a href="https://github.com/tangminjie/GameChainDev-interface">GameChainDev-interface!</a>
          <span className="sm:block"> Game distribution reinvented </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
          Transitioning billions of web 2.0 game players to web 3.0 game play
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto" href="/get-started">
            Get Started
          </a>
          <a className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto" href="/about">
            Learn More
          </a>
        </div>
      </div>
    </div>
    <Box
        sx={{
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
        }}
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "24px",
        }}
        // onClick={preventDefault}
      >
        
        <MuiLink href="https://twitter.com/yalp_games" color="inherit">
        <Twitter />
        </MuiLink>

        <MuiLink href="https://github.com/YalpGames" color="inherit">
          <GitHub />
        </MuiLink>
        
        <MuiLink href="https://github.com/ProjectTwelve/whitepaper" color="inherit">
          <DescriptionOutlined />
        </MuiLink>
      </Box>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
  </section>
  );
}

export default Home
