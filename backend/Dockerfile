FROM golang:1.15.6-buster AS builder

WORKDIR /go/src

COPY go.mod .
RUN go mod download

COPY .  .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/app


FROM alpine:3.12 AS runner

RUN apk add --no-cache \
    ca-certificates \
    curl \
    bash \
    git

RUN set -eux; \
    addgroup -S backend; \
    adduser -D -S -s /bin/bash -G backend backend

USER backend

WORKDIR /home/backend

COPY --chown=backend:backend --from=builder /go/bin/app /app

ADD entrypoint.sh install.sh /

RUN bash -c "/install.sh"

ENTRYPOINT [ "/entrypoint.sh" ]

CMD [ "/app" ]
