This project is part of a university course.

An instant messaging website with real-time-style chat, friend requests, an admin panel, and profile management.

This is a preview of the app.

<img width="515" height="380" alt="User dashboard with friends list and chat" src="https://github.com/user-attachments/assets/b02dd83a-8c1f-496f-acea-3eaf74b574ad" />
<img width="513" height="352" alt="Admin panel for managing users" src="https://github.com/user-attachments/assets/1eb3503c-6774-4612-ab77-b59494eeb02a" />

Built with PHP and MySQL on the backend and vanilla JavaScript, HTML, and CSS on the frontend.

## Features

- Sign up / sign in with session-based authentication
- Search for other users and send friend requests
- Accept or decline incoming friend requests
- Real-time-style chat with friends (messages loaded via polling)
- Edit profile (username, name, email, avatar)
- Delete a friend / remove a connection
- Admin panel to search, add, edit, and delete users

## Tech Stack

- PHP (MySQLi) for the backend
- MySQL for the database
- Vanilla JavaScript (jQuery) for the frontend
- HTML/CSS, no framework

## Project Structure

- `html/` — pages: login, register, admin, add friends, requests
- `php/` — backend endpoints: auth (`login.php`, `register.php`, `logout.php`), messaging (`send_message.php`, `load_messages.php`), friends (`friends.php`, `send_request.php`, `accept_request.php`, `delete_request.php`, `delete_friend.php`), profile (`profile.php`, `update_profile.php`), admin (`list_users.php`, `add_user.php`, `update_user.php`, `delete_user.php`), and `database.php` for the DB connection
- `javascript/` — frontend logic per page (`login.js`, `register.js`, `search.js`, `requests.js`, `display_friends.js`, `admin.js`, `edit_profile.js`)
- `css/` — page-specific stylesheets
- `images/` / `uploads/` — static assets and user-uploaded avatars
