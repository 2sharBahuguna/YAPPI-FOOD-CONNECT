provider "aws" {
  region = "us-east-1" # Change to your preferred AWS region
}

# Security Group
resource "aws_security_group" "yappi_sg" {
  name        = "yappi-food-connect-sg"
  description = "Security group for Yappi Food Connect Server"

  # Inbound Rules
  ingress {
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow from anywhere (change as needed)
  }

  ingress {
    from_port   = 8082
    to_port     = 8082
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH from anywhere (restrict for security)
  }

  # Outbound Rule (Allow All)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "yappi_server" {
  ami           = "ami-xxxxxxxxxxxxxxx" # Replace with a valid Ubuntu AMI ID for your region
  instance_type = "t2.micro"
  key_name      = "your-key-pair"  # Replace with your key pair name
  security_groups = [aws_security_group.yappi_sg.name]

  tags = {
    Name = "yappi-food-connect-server"
  }

  # User Data - Run Commands at Startup
  user_data = <<-EOF
    #!/bin/bash
    echo "Running startup script..."
    
    # Update packages
    sudo apt-get update -y

    # Install required dependencies
    sudo apt-get install -y ca-certificates curl gnupg git

    # Install Docker
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io

    # Enable & Start Docker
    sudo systemctl enable docker
    sudo systemctl start docker

    # Install Docker Compose
    sudo apt install -y docker-compose

    # Clone Git Repository
    git clone https://github.com/2sharBahuguna/YAPPI-FOOD-CONNECT.git

    # Change Directory & Run Docker Compose
    cd YAPPI-FOOD-CONNECT
    sudo docker-compose up -d
    
    echo "Setup completed successfully."
  EOF
}
