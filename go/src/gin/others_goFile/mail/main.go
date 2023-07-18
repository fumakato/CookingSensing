package main

import (
	"fmt"
	"net/smtp"
	"os"
	"strings"
)

var (
	hostname = "smtp.gmail.com"
	port     = 587
	username = "fuma.game.make@gmail.com"
	password = "fumagame2434"
)

func main() {
	from := "fuma.game.make@gmail.com"
	recipients := []string{"fuma20010828@gmail.com"}
	subject := "hello"
	body := "Hello World!\nHello Gopher!"

	auth := smtp.CRAMMD5Auth(username, password)
	msg := []byte(strings.ReplaceAll(fmt.Sprintf("To: %s\nSubject: %s\n\n%s", strings.Join(recipients, ","), subject, body), "\n", "\r\n"))
	if err := smtp.SendMail(fmt.Sprintf("%s:%d", hostname, port), auth, from, recipients, msg); err != nil {
		fmt.Fprintln(os.Stderr, err)
	}
}
