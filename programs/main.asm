mov 0 1
mov 10 2
mov 10 3

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
test [acc] > 1
add 1
mov [acc] 8
fjmp clear

mov 0 1
mov 0 2
mov 100 3
mov 1 5

loop:
mov 1 1
mov 0 1
mov [4] acc
test [acc] = 20
tjmp go_right
test [acc] = 10
tjmp go_left
test [acc] = 60
tjmp end
jmp loop

go_right:
mov [2] acc
add 10
mov [acc] 2
test acc > 240
tjmp ch_left
jmp loop

ch_left:
mov 0 5
jmp loop

go_left:
mov [2] acc
sub 10
mov [acc] 2
test acc < 10
tjmp ch_right
jmp loop

ch_right:
mov 1 5
jmp loop

end: