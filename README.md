## Project Description

This project is a simple and easy to use timer that allows the user to practice the time management technique developed by Francesco Cirillo for more productive work and study. It uses jQuery for its main functions and alarm.

To view a demo : [Link](https://wman27.github.io/Pomodoro-Clock-demo/)  

### Briefing

The requirements this project must satisfy are:

1. A display of the timer for both Session and Break.
2. Both the Session timer and Break timer must have the following buttons:
  - Start
  - Stop
  - Reset
  - Increment and Decrement to adjust time.
  
3. Session timer and break timer displays 25:00 and 05:00 respectively by default and on reset.
4. When a timer reaches 00:00 it sounds an alarm.

### Challenges

The main idea of this project was to further practise using jQuery and refine my javascript skills, some of the challenges I had to deal with were:

1. Making sure the timer cannot display a time above 1:00:00 and below 00:00:00 (to prevent displaying a negative time).
2. The current active timer correctly stops itself and starts the other timer to create a loop between both.

To overcome the first challenge, I used an IF statement to prevent the user from increasing the time to more than 1:00:00.

        if (currentTime > 1000*60*60) {
            endTime = startTime + increment*60;

The idea was to simply have the endTime, which is startTime with an added time difference, be equal to 1 hour or 1000*60*60 ms each time the user tries increase the timer to more than 1:00:00.

To prevent the timer display a negative time I used a similar idea
        
        if (currentTime <0) {
            endTime = startTime;
            
where if the user were to decrease the timer to below 00:00:00 then the endTime would just be equal to startTime so that when the difference is calculated to display the time left it would only show 00:00:00.

To overcome the next challenge, I used an if statement for when the time difference is equal to 0 and the timer is on, the sessionTimer calls the clearInterval() to stop the function and also start the break timer with the breakTimer() function.

        if (currentTime === 0 && timerSwitch === true) {
                clearInterval(countdown);
                breakTimer();

### Improvements

To improve on this project I would consider creating a clock class object first so that both timers does not require a large chunk of code to be repeated twice so that it helps finding errors and help with its readability.
