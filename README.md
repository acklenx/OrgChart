# OrgChart ![image](https://user-images.githubusercontent.com/277458/219515577-9a61df09-c9ce-4435-bd5d-6ff1bd444818.png)
Vanilla Javascript Organizational Chart - no dependencies

**Demo available** at [jsorgchart.netlify.app](https://jsorgchart.netlify.app)

This is a simple org chart with not a lot of bells and whistles. Navigation is **fast!** There are _no required external dependencies_. There is no build file.  This cannot be imported or installed.  You can however copy one file, edit it to point to your data source, and be done (assuming your data is in the supported format).  This org chart is drawn with simple native template literals.  The templates are all included in script tags inside the index.html file.  There are not many of them, but they are just HTML.  Some do call javascript helper functions to format their data.  That should not be required, but it is convenient if you need it.

**screenshot:**

![image](https://user-images.githubusercontent.com/277458/219505916-63badd3a-9fb5-49b0-b5ed-b29c89ded7c3.png)

It has basic search functionality built in.  For large organizations, this is critical because you just can't show everyone in a single view.  The search currently supports searching by name, team, and job title/role.  Searching is fast, with results shown directly below the search box as you type.

When you roll over/mouse over/hover over any person, a preview area displays the full details of the person in the upper left corner of the page.  Clicking on a person will make them the person at top of the org chart.  To navigate up the org chart, simply click on the manager's name at the top (with no details) and the org chart will be centered on them.  It's really fast.  You can check it out at [jsorgchart.netlify.app](https://jsorgchart.netlify.app)

The minimum working version consists of one index.html file with all the javascript and CSS required inline and one data.js file. There are optional other files that are not required for the org chart to function, but make it look and behave a little nicer. A service worker is included with an appropriate manifest file and icons to pass all PWA checks.  Photos are the nicest easy-add if you have them. Photos really help the org chart come to life. Included here are sample photos that at present aren't even sized appropriately (this will reduce the Lighthouse - BEST PRACTICES score by 8 points).

![image](https://user-images.githubusercontent.com/277458/219504959-29042ea5-5d6e-4af6-9303-cfe1577201f2.png)

This page is set to NOT be indexed by default. If you include PII data for your organization, you probably don't want bots to crawl the org chart and get names, phone numbers, and email addresses for your entire organization.  That would be bad.  You should use proper authentication and authorization controls for this org chart and your data.  But at a minimum, I have set the page to not be indexed by default. That will automatically reduce the Lighthouse - SEO score by 10 points to 90. Still green, but not a 100 (but for good reason).



**index.html** contains all script and CSS except for the data.js file.  Each functional area of script is broken out into its own script tag with the ID attribute indicating what the script is used for.

**data.js** is a simple javascript object.  The included file has around 600 fictitious people in it.

**LICENSE** MIT ftw!  Use this as you see fit, but please include the license (you know, with my name on it) if you use it.

**serviceWorker.js** is a complete service worker definition.  On mobile devices in particular you will be able to save the page to your device and it will work completely offline.  It does include the default image in the assets along with a google font, Manrope.  Combined with the serviceworker_for_PWA script and the meta tags in the index.html file this will generate a perfect Lighthouse PWA score. If you're not interested in a WPA you should delete the entire serviceworker_for_PWA script since it tries to refer to the serviceWorker.js file that won't load if you don't have it.   The meta tags are good to keep around and shouldn't cause a problem if you remove the PWA.

**manifest.json** is required for the PWA and service worker.  If you don't want the PWA you should delete this too.  But really it's just nice to have offline mode available.

**images/** includes the two required PWA images size required for Android and iOS.  They are both org chart images and at least one is maskable as required.

**photos/** is a directory where you can put your photos of your organization.  Photos by default should be named <userID>.jpg  This can be changed.  Because the sample data supplied is fake, the user id is the username portion of each person's email address.  The sample CEO Isabella Gray's email address is isabella.gray@example.com, her id is isabella.gray, and her photo is found that the url /photos/isabella.gray.jpg but in practice, it should not be PII data, which presumably YOUR userIds are not.

**photos/_default_.webp** is a default missing photo picture. If you use photos, it's nice to have everything spaced the same. Without any photos, this photo and reference should be removed

**photos/50x50/** is the default thumbnail size for photos. Everything in the parent directory is included here but should be resized to 50 pixels by 50 pixels.  Might not be used at the time of this writing.  The is a getPhotoUrl() helper that takes a second parameter which is the size of the photo.  That function could, in theory, call a resizer proxy... it's just not at the moment.

**favicon.ico** is simple to put a delightful little org chart icon in your bookmarks should you choose to bookmark a site where this is deployed. Very not required, but 100% requested by browsers when they load your page.



Images are provided by uifaces.com via [Random User](https://randomuser.me/photos) and by [Generated Photos](https://generated.photos).  Please see their terms if you want to redistribute their work.  If you use your own photos you should remove the citation at the bottom of the page.