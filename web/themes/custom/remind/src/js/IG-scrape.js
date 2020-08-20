(function () {
  Drupal.behaviors.ig_posts = {
    attach: async function (context, settings) {

      context.querySelectorAll('.ig-profile').forEach(block => {
        const username = block.dataset.username;
        console.log(`Loading Profile @${username}`);

        getIGPosts(username)
          .then(posts => {
            const grid = document.createElement('div');
            grid.setAttribute('grid', 'small');
            grid.classList.add("width-child--1-1");
            grid.classList.add("width-child--1-2@s");
            grid.classList.add("width-child--1-4@l");

            posts.forEach((post, i) => {
              console.log(post);
              if (i < 8) {
                grid.insertAdjacentHTML('beforeEnd', `
                  <div>
                    <a href="https://www.instagram.com/p/${post.node.shortcode}"/>
                      <img src="${post.node.display_url}" alt="${post.node.accessibility_caption}">
                    </a>
                  </div>
                `);
              }
            });

            //block.innerHTML = `Successfully loaded ${posts.length} posts from @${username}`;
            setTimeout(() => {
              block.innerHTML = '';
              block.appendChild(grid);
            }, 2500);
          });



      });
    }
  };
})();

function getIGPosts(user) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.instagram.com/${user}/`)
      .then(resp => resp.text())
      .then(body => {
        let x = body.search(/"entry_data"/g);
        let y = body.search(/,"hostname"/g);
        const posts = JSON.parse('{' + body.substring(x, y) + '}').entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
        resolve(posts);
      });
    //.catch(reject('Unable to retrieve posts at this time.'));
  });
}