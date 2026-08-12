from fastapi import APIRouter, Depends, Response
from app.controller.rasturant_controller import (
    menu_category, menu_item, createReastaurant, getReastaurant, get_job, createJob,
    WorkweeklySchudle, OpenAndClose , updateMenuItem , deleteMenuItem, getReastaurantDashboard
)

routerReastaurant = APIRouter(
    prefix="/reastaurant",
    tags=["reastaurantMenu"]
)

routerReastaurant.add_api_route("/createreastaurant" , createReastaurant ,  methods=["POST"])
routerReastaurant.add_api_route("/getReastaurant" , getReastaurant , methods=["GET"])
routerReastaurant.add_api_route("/getReastaurantDashboard", getReastaurantDashboard , methods=["GET"])
routerReastaurant.add_api_route("/workweeklyschudle" , WorkweeklySchudle ,  methods=["PUT", "POST"])
routerReastaurant.add_api_route("/shopopenandclose" , OpenAndClose ,  methods=["POST"])
routerReastaurant.add_api_route("/menu" , menu_category ,  methods=["POST"])
routerReastaurant.add_api_route("/menu_item/{user_id}" , menu_item ,  methods=["GET"])
routerReastaurant.add_api_route("/menu_item/{user_id}/{id}" , menu_item ,  methods=["GET"])
routerReastaurant.add_api_route("/get-job/{user_id}" , get_job ,  methods=["GET"])
routerReastaurant.add_api_route("/create-job" , createJob ,  methods=["POST"])
routerReastaurant.add_api_route("/updateReastaurant/{user_id}/{id}", updateMenuItem , methods=["PUT"])
routerReastaurant.add_api_route("/deleteReastaurant/{user_id}/{id}",  deleteMenuItem , methods=["DELETE"])

