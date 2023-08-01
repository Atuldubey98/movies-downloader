
# Movie Downloader

A movie downloader for torrents available online from famous torrent movie sites like yts,piratesbay etc. Scarapping the torrents online using cheerio and sending them back using express.js as response to frontend. Using imdb as movie fetch services.


## Acknowledgements

 - [Torrent Stream package for streaming](https://www.npmjs.com/package/torrent-stream)
 - [Cheerio as scrapper](https://cheerio.js.org/)

## API Reference

#### Get all movies

```http
  GET /api/v1/all/search?query=${query}
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query` | `string` | **Required**. Your search Key word  |
| `page` | `number` | **Optional**. Page Number |

Searching for a movie through all the torrents avaiable


#### Get all files from torrent

```http
  GET /api/v1/torrent/files?magnetUrl=${magnetUrl}
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `magnetUrl` | `string` | **Required**. Magnet Url  |


Get all the files present in the magnet specified

#### Streaming the video

```http
  GET /api/v1/all/search?magnetUrl=${magnetUrl}&videoPath=${videoPath}
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `magnetUrl` | `string` | **Required**. Magnet Url  |
| `videoPath` | `string` | **Optional**. File name  |


If the file in present in videoPath then it will stream the video present in it otherwise it will download the file.


## Appendix

Making the downloading of torrents and streaming it very easy. Happy Coding !
## Authors

- [Atuldubey98](https://github.com/Atuldubey98)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_API_KEY`=`YOUR_TMDB_API_KEY`
`VITE_API_URL`=https://api.themoviedb.org/3
`VITE_IMAGE_URL`=https://image.tmdb.org/t/p/original/
`VITE_TORRENT_URL`=`YOUR_BASE_URL`
## Installation

Install my-project with npm

```bash
  npm i
  cd movies-downloader/
```
    
## Features

- Streaming Torrent Movies
- Downloading Movies
- Ratings of all the movies
- Cross platform

## Deploying on render

- Create a .env file in the project folder like .env.production
- Use Docker to create a project in Render
- In Health check path write /api/v1/health
- Now in Dockerfile path write ./Dockerfile.prod
- Deploy the service.

