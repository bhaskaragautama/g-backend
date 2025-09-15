## About this Project
This is a test project for demonstrating CRUD of company details. It uses LaraReact Dashboard Template built with Laravel, Inertia.js, and React. It provides a modern and responsive admin dashboard interface for web applications, cloned from the popular [PrimeReact Admin Template](https://www.primefaces.org/primereact/showcase/#/dashboard).


## Getting Started

**Clone Repository:**
   ```bash
   https://github.com/bhaskaragautama/g-backend.git
   ```

## Frontend
```shell
$ npm install
$ npm run dev
```

## Backend
```shell
$ composer install
```
Create a database, then copy `.env.example` to `.env`.

```shell
$ cp .env.example .env
```

Update your database credentials in the `.env` file.

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

Generate an application key:

```shell
$ php artisan key:generate
```

Run migrations and seed the database:

```shell
$ php artisan migrate --seed
```
**PS:** I have added a seeder for `areas`, `postcodes`, and `prefectures` tables. So, you don't need to import the `.sql` file manually.

Start the Laravel development server:

```shell
$ php artisan serve
```

Now, you can access the application in your web browser at `http://localhost:8000` (or the port specified in your terminal).

## Development Story
Honestly, this is my first time working with Inertia.js and React. So, most of my time was spent learning instead of actual development. I have prior experience with Laravel though. I have learned a lot from this project, and I am sure it will help me in future projects. This is the result of my learning. I know it is not much, but I am willing to learn and improve. If you have any suggestions or feedback, please let me know. I am open to learning and improving.

**PS:** I have spent likely 80% of my time working on the frontend in this backend project.

### About the requirements
There are 2 requirements or feature tasks mentioned in the project. Here is what I think and how I have implemented them.
1. **Address Auto-fill**: I have implemented this feature using the `fetch` API to get the address details from the `postcodes` table based on the entered postcode. Here is the catch. The requirement says `prefecture` input type should be a dropdown (`select` form element). But, if `prefecture` (and other two fields [`city`, `local`]) are auto-filled and controlled by the `postcode`, I think the three of them should be read-only (or disabled). Because, if the user can change them, it will create inconsistency in the data. For example, if the user enters a postcode for Tokyo, but changes the prefecture to Osaka, it will create inconsistency in the data. So, I have made them disabled. If you want me to change it to a dropdown, please let me know.

2. **Postcode validation**: If in DB postcode value is 600000, allow the user to get it when inputting 0600000. The thing is, postcodes are 7 digits long. So, the sentence "if in DB postcode value is 600000", is confusing because there is no 6 digits postcode stored in the DB. "allow the user to get it when inputting 0600000" is clear though, because that is a valid 7 digits postcode. So, I don't add any validation for this. I just limit the input to 7 digits. If the postcode exists in the DB, it will auto-fill the address fields. If not, it will show an error toast notification. That's it.

3. **Image preview on edit**: I have implemented this feature using PrimeReact's `OverlayPanel` component. This is a must-have feature in my opinion. Because, if the user is editing a company, they should be able to see the current image.

4. **Company module list page**: I have implemented the company list page using React DataTable component. It is a simple table with pagination, sorting, and searching features. I have added edit and delete buttons for each company. The delete button shows a confirmation dialog before deleting the company. I am using PrimeReact's `confirmDialog` component for this. I have also added a button to create a new company.


### Time Taken
- Study Time: ±16 hours
- Development Time: ±4 hours

## Development Environment
- OS: 
  - Ubuntu 22.04 LTS 64-bit
  - Windows 11 with WSL2 (Ubuntu 22.04 LTS)
- Editor: Visual Studio Code
- AI Assistant: GitHub Copilot
- Node.js: 22.12.0
- npm: 9.5.1
- PHP: 8.2.4
- Composer: 2.6.4