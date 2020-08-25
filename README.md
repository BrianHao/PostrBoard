# PostrBoard
**PostrBoard** is a place to post, share, and discuss things of interest across various topics. It functions similarly to a message board, or the website Reddit.com.


## User Stories
- A user is able to browse all the topical **Boards** on the site.
  > - The site starts with default Boards for general topics such as 'Technology', 'Gaming', 'Sports', and more.
  > - Boards are also created by registered users to create a space for users to gather around a particular topic/theme.
  > - Each Board has a name (its topic/theme), an associated image banner, and a short description of the topic.
  > - It also contains metadata such as its creator and a count of Posts for that Board.

- A user is able to click into a Board to view the **Posts** under that board.
  > - Posts are created by registered users to start a discussion or share some content relevant to the Board's topic.
  > - Each Post has a title, an optional external link (if the poster wants to discuss/share an offsite URL), as well as a text field as the content of the post.
  > - It also contains metadata such as its creator and a count of Comments under that Board.

- A user is able to click into a Post to view a list of **Comments** under that Post.
  > - Comments are left by registered users to discuss the topic and contents of that particular Post.
  > - Each Comment has a text field as the content of the Comment.
  > - It also contains metadata such as its creator and a timestamp of when that comment was created and last edited.
  
- A user may sign up for an **account** by providing a username and password.
	> - A user can only register once with any given username.
	> - The user can then log in via their username and password in order to access their account.
	
- Once logged in, the user can **create Boards**
	> - Because of the nature of Boards, only an admin can delete them.
  
- Once logged in, the user can **create Posts** under a Board
  > - They may also **edit** and **delete** Posts that were created by them.
  
- Once logged in, the user can **create Comments** under a Post
	> - They may also **edit** and **delete** Comments that were created by them.



## Technologies
Tradyr was created using the MERN Stack:
- **Back-end:** Node.js + Express
- **Database:** MongoDB
- **Front-end:** React.js + Bootstrap

### Created By: Brian Hao
