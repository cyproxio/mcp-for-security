#!/bin/bash

# Smuggler dizini ve path
SMUGGLER_DIR="./smuggler"
SMUGGLER_PATH="$SMUGGLER_DIR/smuggler.py"

# Smuggler yoksa klonla
if [ ! -d "$SMUGGLER_DIR" ]; then
    echo "Smuggler aracı indiriliyor..."
    git clone https://github.com/defparam/smuggler.git
    
    if [ $? -ne 0 ]; then
        echo "Hata: Smuggler indirilemiyor."
        exit 1
    fi
fi

# Node modülleri yoksa yükle
if [ ! -d "node_modules" ]; then
    echo "Node modülleri yükleniyor..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "Hata: Node modülleri yüklenemedi."
        exit 1
    fi
fi

# Derlenmemiş ise derle
if [ ! -d "build" ]; then
    echo "Proje derleniyor..."
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "Hata: Proje derlenemedi."
        exit 1
    fi
fi

# MCP sunucusunu başlat
echo "Smuggler MCP başlatılıyor..."
node build/index.js "$SMUGGLER_PATH" 