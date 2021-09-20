Feature: Users exchange messages, do you the messages?

  Want to check if sockets work well

  Scenario: User one sends a message to user two

    Given user "one" logged in in browser "one"
    Given user "two" logged in in browser "two"

    When user "one" sends a "Hello!" to user "two"
    Then user "one" sees "Hello!"  in the message window
    And user "two" sees "Hello!" in the message window