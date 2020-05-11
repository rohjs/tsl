## Promise Order

```sh
> 111111
> 222222
# after a second
> setTimeout in 2
> Banana
# after 4 more seconds
> setTimeout in 1
> Apple
```

## Tricky Promise Order

```sh
> 111111
> 222222
# after a second
> setTimeout in 2
# after 4 more seconds
> setTimeout in 1
# after 1 more second
> Apple
> Banana
```
