## Promise Order

```sh
> 111111
> 222222
# after a second (1초 후)
> setTimeout in 2
> Banana
# after 4 more seconds (4초 후)
> setTimeout in 1
> Apple
```

## Tricky Promise Order

```sh
> 111111
> 222222
# after a second (1초 후)
> setTimeout in 2
# after 4 more seconds (4초 후)
> setTimeout in 1
# after 1 more second (1초 후)
> Apple
> Banana
```
