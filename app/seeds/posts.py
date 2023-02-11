from app.models import db, Post, environment, SCHEMA

def seed_posts():
    ch1_7 = Post(
        author_id = 2, title = "Guide to 1-7", body ="<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis feugiat ligula, dictum ultrices nisl. Pellentesque nisi arcu, elementum elementum nisi a, ullamcorper venenatis tortor. Phasellus laoreet id tortor vel gravida. Nam lacus libero, tempus vel lectus quis, posuere sodales turpis. Ut eget ultrices nunc. Quisque tempor metus eget sem dictum, vitae volutpat risus elementum. Vestibulum ut dui at felis mattis venenatis viverra nec massa. Nunc sagittis odio id arcu scelerisque, non lacinia orci tristique. Fusce dapibus interdum libero, a sodales orci auctor sed. Aliquam eu rhoncus lacus, vestibulum iaculis enim. Maecenas felis sapien, fringilla quis nunc fermentum, bibendum facilisis mauris.</b> Vivamus interdum ipsum ut consectetur mollis. <i>Vestibulum sagittis purus leo, a semper leo fermentum vel. Mauris elit risus, consequat nec quam nec, interdum convallis ipsum. Ut porta ex id nulla volutpat, eu lobortis nibh elementum. Aliquam egestas faucibus aliquam. Nam eget condimentum dui, tempor scelerisque ligula. Phasellus facilisis ligula nec aliquet auctor. Aenean ex libero, venenatis eu viverra ac, vestibulum in ligula. Maecenas accumsan dictum eros quis volutpat. Cras vitae ex in tellus sagittis mattis eu nec elit. Ut tempor, urna id efficitur cursus, libero leo dapibus nisl, congue volutpat mi arcu sit amet erat. Nulla at lacus lectus. Sed sit amet odio ut ex iaculis eleifend ac sed turpis. Nam id ultrices neque. Sed dictum justo quis eros fermentum sagittis. Nullam eget quam mi. Praesent in nibh id sem ullamcorper bibendum. Suspendisse bibendum neque quis risus hendrerit commodo. In eget nibh quis ipsum pulvinar efficitur non at augue. Donec laoreet elementum odio in vestibulum. Sed id orci mattis, finibus lacus quis, mattis orci. Quisque ut porta est. Ut ac dapibus massa. Nullam laoreet metus id accumsan vulputate. Curabitur egestas felis ac quam ultricies, non egestas velit commodo. Sed fringilla quam purus, ut lobortis massa pulvinar quis. Maecenas turpis nibh, dignissim eu dignissim sed, luctus a justo. Vestibulum ut arcu vulputate, auctor ante sit amet, hendrerit magna. Cras ut tortor scelerisque purus pulvinar molestie in scelerisque tellus. Ut ac posuere quam. Suspendisse ultricies neque ac imperdiet varius. Vestibulum et maximus nunc. Nullam mattis, arcu sed cursus pharetra, massa sapien pharetra lectus, vitae varius risus tortor sit amet ex."
    )
    ch4_8 = Post (
        author_id = 3, title = "Guide to 4-8", body ="<h1>Lorem ipsum dolor sit amet</h1>, consectetur adipiscing elit. Integer quis feugiat ligula, dictum ultrices nisl. Pellentesque nisi arcu, elementum elementum nisi a, ullamcorper venenatis tortor. <b>Phasellus laoreet id tortor vel gravida. Nam lacus libero, tempus vel lectus quis, posuere sodales turpis. Ut eget ultrices nunc. Quisque tempor metus eget sem dictum, vitae volutpat risus elementum. Vestibulum ut dui at felis mattis venenatis viverra nec massa. Nunc sagittis odio id arcu scelerisque, non lacinia orci tristique. Fusce dapibus interdum libero, a sodales orci auctor sed. Aliquam eu rhoncus lacus, vestibulum iaculis enim. Maecenas felis sapien, fringilla quis nunc fermentum, bibendum facilisis mauris. Vivamus interdum ipsum ut consectetur mollis. Vestibulum sagittis purus leo, a semper leo fermentum vel."

    )
    ch9_1 = Post(
        author_id = 4, title = "Guide to 9-1", body = "<u>Lorem ipsum dolor sit amet</u>, consectetur adipiscing elit. Integer quis feugiat ligula, dictum ultrices nisl. Pellentesque nisi arcu, elementum elementum nisi a, ullamcorper venenatis tortor. Phasellus laoreet id tortor vel gravida. Nam lacus libero, tempus vel lectus quis, posuere sodales turpis. Ut eget ultrices nunc. Quisque tempor metus eget sem dictum, vitae volutpat risus elementum. Vestibulum ut dui at felis mattis venenatis viverra nec massa. Nunc sagittis odio id arcu scelerisque, non lacinia orci tristique. Fusce dapibus interdum libero, a sodales orci auctor sed. Aliquam eu rhoncus lacus, vestibulum iaculis enim. <i>Maecenas felis sapien</i>, fringilla quis nunc fermentum, bibendum facilisis mauris. Vivamus interdum ipsum ut consectetur mollis. Vestibulum sagittis purus leo, a semper leo fermentum vel."
        )

    db.session.add(ch1_7)
    db.session.add(ch4_8)
    db.session.add(ch9_1)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
