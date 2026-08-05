

class RiderRepositrories:

    def get_rirder(self ,db , rider_id):
        return db.query(Rider).filter(Rider.id == rider.id).first()

    def save(self , db , rider): 
       db.commit()
       db.refresh()
