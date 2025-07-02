FROM node:18-bullseye

# Set working directory
WORKDIR /app


# Enable Go modules
ENV GO111MODULE=on
ENV GOPROXY=https://proxy.golang.org,direct

# Install Python, pip, Go, virtualenv, and other tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    jq \
    curl \
    git \
    masscan \
    nmap \
    ruby-full && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    git clone https://github.com/sqlmapproject/sqlmap /opt/sqlmap && \
    ln -s /opt/sqlmap/sqlmap.py /usr/local/bin/sqlmap && \
    chmod +x /usr/local/bin/sqlmap

    
# Install latest Go manually
ENV GOLANG_VERSION=1.24.4
RUN curl -LO https://go.dev/dl/go${GOLANG_VERSION}.linux-arm64.tar.gz && \
    rm -rf /usr/local/go && \
    tar -C /usr/local -xzf go${GOLANG_VERSION}.linux-arm64.tar.gz && \
    rm go${GOLANG_VERSION}.linux-arm64.tar.gz
ENV PATH="/usr/local/go/bin:$PATH"

# Create a global virtualenv
RUN python3 -m venv /opt/venv

# Install pip tools inside venv if needed (optional)
RUN /opt/venv/bin/pip install --upgrade pip

# Add venv to PATH (so pip, python point to venv by default)
ENV PATH="/opt/venv/bin:$PATH"

# Copy project files
COPY . .

# Make sure the entrypoint is executable
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh && /app/start.sh

RUN cat mcp-config.json
CMD ["bash"]