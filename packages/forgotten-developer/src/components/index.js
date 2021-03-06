import React from "react";
import { connect, Head } from "frontity";
import List from "./list/list";
import Post from "./post";
import Header from "./header";
import Title from "./title";
import Nav from "./nav";

import { Global, css, styled } from "frontity";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state, actions }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        ></link>

        {/* Scripts for Syntax Highlighting*/}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/prism.min.js" integrity="sha512-WkVkkoB31AoI9DAk6SEEEyacH9etQXKUov4JRRuM1Y681VsTq7jYgrRw06cbP6Io7kPsKx+tLFpH/HXZSZ2YEQ==" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/components/prism-java.min.js" integrity="sha512-p2vAaPEsPvlIESCpoEI5IyzZowfdVZ2O39PsrOrkuTQl+AjD57T4L/Wxv5S8WCToLou0twQZaWO+tt660Rqb6Q==" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/components/prism-javascript.min.js" integrity="sha512-bcEaqkUmZaRn/mfetUNsz6y4SxOcc+eEqXOzWYWeXfSUS9mt1C/12fBAxT99mKcA1U1tIw6O9o17+AGqQ3Wmtg==" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js" integrity="sha512-VTY+zyTivsIMZ+ANMHvwsnz0hIRHyu/I+7vLqaGaQs//PnQEuNyrLsCwNYo64H92vHojvj2Oiq7bfli0fTSDkQ==" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://unpkg.com/dracula-prism/css/dracula-prism.css" />

      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <Header />

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Nav />
        <PostsCotainer>
          {data.isArchive && (
            <div>
              <List />
            </div>
          )}
          {data.isPost && (
            <div>
              <Post />
            </div>
          )}
          {data.isPage && (
            <div>
              <Post />
            </div>
          )}
        </PostsCotainer>
      </Main>
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: "Source Code Pro", monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #11100f;
    color: white;
  }

  a {
    color: white;
    text-decoration: underline;
    text-decoration-color: #0f0;
    &:hover {
      color: #0f0;
    }
  }

  /* Ham Menu*/
  .ham-menu {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 330ms ease-out;
    float: right;
  }

  .ham-menu.open {
    transform: rotate(-45deg);
  }

  .line-menu {
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    height: 6px;
  }

  .line-menu.half {
    width: 50%;
  }

  .line-menu.start {
    transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
    transform-origin: right;
  }

  .open .line-menu.start {
    transform: rotate(-90deg) translateX(3px);
  }

  .line-menu.end {
    align-self: flex-end;
    transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
    transform-origin: left;
  }

  .open .line-menu.end {
    transform: rotate(-90deg) translateX(-3px);
  }
`;

const Main = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
`;

const SideBar = styled.div`
  box-sizing: border-box;
  overflow-wrap: break-word;
  margin: 24px 0 0 0;
  display: block;
  padding: 10px;
  flex-basis: 15rem;
  flex-grow: 1;
  top: 64px;
  width: 30%;
`;

const PostsCotainer = styled.div`
  flex-basis: 0;
  flex-grow: 999;
  min-width: 66%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
`;
