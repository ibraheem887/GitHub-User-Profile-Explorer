document.getElementById("searchForm").addEventListener("submit", submitFunction);

        const clientId = "Ov23liJDsOxNkGvj6f11";
        const clientSecret = "e4f70a16bc98dde0d907fc6da544859ed47f0a26";

        async function submitFunction(event) {
            event.preventDefault();
            const username = document.getElementById("search").value;
            const gitURL = `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`;
            const reposURL = `https://api.github.com/users/${username}/repos?client_id=${clientId}&client_secret=${clientSecret}`;

            try {
                const response = await fetch(gitURL);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const profile = await response.json();
                console.log(profile); 
                displayProfile(profile);

                // Fetch repositories
                const reposResponse = await fetch(reposURL);
                const repos = await reposResponse.json();
                displayRepo(repos);
            } catch (error) {
                document.getElementById("result").innerHTML = `<p>${error.message}</p>`;
            }
        }

        function displayProfile(profile) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = ''; // Clear previous results

            // Create elements
            const usernameElement = document.createElement("h2");
            usernameElement.textContent = profile.login;

            const avatarElement = document.createElement("img");
            avatarElement.src = profile.avatar_url;
            avatarElement.alt = profile.login;
            avatarElement.width = 100;

            // Add email and country
            const emailElement = document.createElement("p");
            emailElement.textContent = `Email: ${profile.email || 'Not provided'}`;

            const countryElement = document.createElement("p");
            countryElement.textContent = `Location: ${profile.location || 'Not provided'}`;

            // Append elements to the resultDiv
            resultDiv.appendChild(usernameElement);
            resultDiv.appendChild(avatarElement);
            resultDiv.appendChild(emailElement);
            resultDiv.appendChild(countryElement);
        }

        function displayRepo(repos) {
            const repoDiv = document.getElementById("Repo");
            repoDiv.innerHTML = ''; // Clear previous results

            // Check if there are repositories
            if (repos.length === 0) {
                repoDiv.innerHTML = '<p>No repositories found.</p>';
                return;
            }

            // Create list of repositories
            const ul = document.createElement("ul");
            repos.forEach(repo => {
                const li = document.createElement("li");

                // Create a link for the repository name
                const repoLink = document.createElement("a");
                repoLink.href = repo.html_url; // Repository URL
                repoLink.textContent = repo.name; // Repository name
                repoLink.target = "_blank"; // Open in new tab

                // Create a description element
                const descriptionElement = document.createElement("p");
                descriptionElement.textContent = `Description: ${repo.description || 'No description available'}`;

                // Append name and description to the list item
                li.appendChild(repoLink);
                li.appendChild(descriptionElement);
                ul.appendChild(li);
            });

            // Append the list to the repoDiv
            repoDiv.appendChild(ul);
        }