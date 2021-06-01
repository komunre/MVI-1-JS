mov 0 1
mov 10 2
mov 10 3

draw_loop:
mov 1 1
mov 0 1
mov [2] acc
add 5
mov [acc] 2

mov [3] acc
add 5
mov [acc] 3

mov [2] acc
test acc > 149
fjmp draw_loop

start_load:
mov 0 8
clear:
mov 1 1
mov 0 1
load_loop:
mov 150 2
mov 100 3
mov 120 2
mov 80 3
mov 100 2
mov 50 3
mov 120 2
mov 180 3
mov 150 2
mov 20 3
mov 180 2
mov 50 3
mov 180 2
mov 80 3
mov [8] acc
test [acc] > 10
add 1
mov [acc] 8
fjmp clear

mov 230 1
mov 120 2
mov 555 5
mov [1] acc

loop:
add [1]
sub [2]
mul 2
add 1
mov [acc] 6
test [acc] > 1000
fjmp loop

end:
mov 123 7
mov 123 8
