FROM golang:1.14.6

ENV GO111MODULE=on \
    PORT=8080

WORKDIR /app/server
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .

RUN go build
CMD ["./dndApi"]