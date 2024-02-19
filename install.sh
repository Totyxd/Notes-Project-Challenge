#!/bin/bash

# Install nvm and Node.js v20.10.0
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install 20.10.0
nvm use 20.10.0

# Install and configure PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -u postgres psql -c "CREATE DATABASE Notes;"
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD 'T_V1gL.M!cCa3wD^lM2h';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE Notes TO postgres;"

# Install Angular CLI globally
npm install -g @angular/cli

cd backend/
npm install
node ./bin/www.js

cd ..

cd frontend/Notes-Frontend
npm install
ng serve

cd ../..

echo "Installation completed successfully."


echo "Installation completed successfully."
