class Api::V1::ImagesController < ApplicationController
  def index
    render json: Image.all
  end

  def create
    image = Image.create(Image_params)
    render json: image
  end

  def destroy
    Image.destroy(params[:id])
  end

  def update
    image = Image.find(params[:id])
    image.update_attributes(Image_params)
    render json: image
  end

  private

  def Image_params
    params.require(:image).permit(:id, :url)
  end
end