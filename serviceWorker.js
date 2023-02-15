const cacheName = 'vanillaOrgChart_v4';
const assets = [
	"index.html",
	"data.js",
	"photos/_default_.webp",
	"https://fonts.googleapis.com/css2?family=Manrope:wght@300&display=swap",
	"https://fonts.googleapis.com/css2?family=Manrope:wght@300;800&display=swap"
];

async function cacheFirst( request, fallbackUrl )
{
	let fastestResponse;
	const responseFromCache = await caches.match( request );
	if ( responseFromCache )
	{
		fastestResponse = responseFromCache;
		everythingElseNext( request, fallbackUrl );  // do this behind the scenes;
	} else
	{
		fastestResponse = await everythingElseNext( request, fallbackUrl );
	}
	return fastestResponse;

	async function everythingElseNext( request, fallbackUrl )
	{
		let fastestResponse;
		try
		{
			const responseFromNetwork = await fetch( request );
			if ( responseFromNetwork.status === 200 )
			{
				putInCache( request, responseFromNetwork.clone() ); // do NOT make the user 'await'... just put it in there for later
				fastestResponse = responseFromNetwork;
			} else
			{
				const fallbackResponse = await caches.match( fallbackUrl );
				fastestResponse = await failLast( request, fallbackUrl )
			}
		}
		catch ( error )
		{
			fastestResponse = await failLast( request, fallbackUrl )
		}

		async function failLast( request, fallbackUrl, error )
		{
			const fallbackResponse = await caches.match( fallbackUrl );
			if ( fallbackResponse )
			{
				fastestResponse = fallbackResponse;
			} else
			{
				fastestResponse = new Response(
					'Network error happened', {
						status: 408,
						headers: { 'Content-Type': 'text/plain' }
					} );
			}
			return fastestResponse;
		}
		return fastestResponse;

		async function putInCache( request, response )
		{
			if ( response.status === 200 )
			{
				const cache = await caches.open( cacheName );
				await cache.put( request, response );
			}
		}
	}
}

self.addEventListener( 'install', function ( event )
{
	self.skipWaiting();  // this newly installed service worker progresses into the activating state, _regardless_ of whether there is already an active service worker.
} );

self.addEventListener( 'fetch', ( event ) =>
{
	event.respondWith(
		cacheFirst(
			event.request,
			"photos/_default_.webp"
		)
	);
} );
