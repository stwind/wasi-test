FROM ubuntu:24.04

ARG WASI_VERSION=25
ENV WASI_VERSION=${WASI_VERSION}

ENV FILENAME="wasi-sdk-${WASI_VERSION}.0-x86_64-linux.tar.gz"
ENV URL="https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-${WASI_VERSION}/${FILENAME}"

RUN apt-get -yqq update && \
    apt-get -yqq install wget && \
    wget -qc "${URL}" && \
    tar zxf ${FILENAME} && \
    rm -f ${FILENAME} && \
    rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]