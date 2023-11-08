<br/>
<p align="center">
  <a href="https://github.com/mikemisha/assetto-depot">
    <img src="https://www.assettodepot.com/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75" alt="Logo" width="500" height="100">
  </a>

  <h3 align="center">Assetto Depot</h3>

  <p align="center">
    Created by Michael Karabach
    <br/>
    <br/>
    <a href="https://github.com/mikemisha/assetto-depot"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://www.assettodepot.com/">View Website</a>
    .
    <a href="https://github.com/mikemisha/assetto-depot/issues">Report Bug</a>
    .
    <a href="https://github.com/mikemisha/assetto-depot/issues">Request Feature</a>
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

![Screen Shot](https://michaelkarabach.com/images/assetto-depot.png)

Website that lists a large collection of mods for the sim racing game Assetto Corsa. It allows you to search through filters and categories of a bunch of verified tracks and cars.

## Built With

* React
* Next.JS
* Redux
* Material UI

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

1) Make sure to have Node installed on machine. Node.js can be installed in different ways. Official packages for all the major platforms are available at https://nodejs.org/download/. One very convenient way to install Node.js is through a package manager. In this case, every operating system has its own. Other package managers for MacOS, Linux, and Windows are listed in https://nodejs.org/download/package-manager/

2) Install the Supabase CLI as dev dependency via npm:
`npm install supabase --save-dev`

3) make sure to have Docker installed. See [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) on how to get Docker on your machine.




### Installation

1. Get a free API Key from supabase at [https://supabase.com/pricing](https://supabase.com/pricing) and Firebase API key at [https://firebase.google.com/](https://firebase.google.com/)

2. Clone the repo

```sh
git clone https://github.com/mikeMisha/practice-my-spelling.git
```

3. Install NPM packages

```sh
npm install
```



## Usage

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. run the development server: 
    ```bash
     npm run dev
     # or
     yarn dev
     # or
     pnpm dev
     # or
     bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. Log in to the Supabase CLI
  
    run `npx supabase login`
  
    Start Supabase services
    Initialize Supabase to set up the configuration for developing your project locally:
  
    `supabase init`
  
    Make sure Docker is running. The start command uses Docker to start the Supabase services.
    This command may take a while to run if this is the first time using the CLI.
  
    `supabase start`
  
    Once all of the Supabase services are running, you'll see output containing your local Supabase credentials. It should look like this, with urls and keys that you'll use in your local   project:
  
```
           API URL: http://localhost:54321
            DB URL: postgresql://postgres:postgres@localhost:54322/postgres
        Studio URL: http://localhost:54323
      Inbucket URL: http://localhost:54324
          anon_key: eyJh......
   service_role_key: eyJh......
```
   

4. configure `.env` file with the Supabase API keys provided and add variables for Nodemailer.
  
    ```
    GMAIL_USER = "<Your Gmail Username>"
    GMAIL_PASS = "<Your Gmail App Password>"
    NODEMAILER_FROM = "<Your Nodemailer From Address>"
    NODEMAILER_TO = "<Your Nodemailer To Address>"
    
    SUPABASE_URL="<Your Supabase URL>"
    SUPABASE_ANON_KEY = "<Your Supabase Anon Key>"
    API_URL: "<Your API URL>"
    DB_URL: "<Your Database URL>"
    Studio_URL: "<Your Studio URL>"
    Inbucket_URL: "<Your Inbucket URL>"
    anon_key: "<Your Anon Key>"
    service_role_key: "<Your Service Role Key>"
    ```

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/mikemisha/assetto-depot/blob/main/LICENSE.md) for more information.

## Authors

* **Michael Karabach** - *Front End Developer * - [Michael Karabach](https://github.com/mikeMisha) - **

* []()
* []()
* []()
