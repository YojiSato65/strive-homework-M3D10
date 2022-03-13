window.onload = async () =>
{
    await fetchMovies()
}

async function fetchMovies()
{
    const categoryWrapper = document.getElementById('category-wrapper')
    try
    {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/movies/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI4YjA3YTRlYTdiMTAwMTVkMDY3YWIiLCJpYXQiOjE2NDcwMDA0MzEsImV4cCI6MTY0ODIxMDAzMX0.eU0TYKPdFYRlk_xDJHo5xaihakOVpQhJqx_UberrqTU"
            }
        })

        if (response.ok)
        {
            const categories = await response.json()
            console.log(categories)

            const movies = await Promise.all(categories.map(async category =>
            {
                const res = await fetch("https://striveschool-api.herokuapp.com/api/movies/${category}", {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI4YjA3YTRlYTdiMTAwMTVkMDY3YWIiLCJpYXQiOjE2NDcwMDA0MzEsImV4cCI6MTY0ODIxMDAzMX0.eU0TYKPdFYRlk_xDJHo5xaihakOVpQhJqx_UberrqTU"
                    }
                })
                return await res.json()
            }))
            console.log(movies)
            movies.forEach(arr =>
            {
                const chunks = []
                let i = 0
                while (i < arr.length)
                {
                    chunks.push(arr.slice(i, (i += 6)))
                }
                const gallery = `
              <h4 class="mb-2 d-block">${arr[0].category}</h4>
              ${chunks.map(chunk => `
              <div class="row" >
                ${chunk.map(movie => `
                <div class="col-sm-6 col-md-4 col-lg-2 px-1">
                  <div class="card h-100">
                    <a href='/strive-homework-M3D10/Project-netflix/backoffice.html?id=${movie._id}'><img src="${movie.imageUrl}" class="card-img-top" alt="movie-img"></a>
                  </div>
                </div>
                `).join('')}
              </div>
                  `).join('')}
            `
                categoryWrapper.innerHTML += gallery
            })

        }
    }

    catch (error)
    {
        console.log('error')
    }
}