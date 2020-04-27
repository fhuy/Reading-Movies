const util = require('../../../utils/util.js'),
      app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const categoryTitle = options.title;
    wx.setNavigationBarTitle({
      title: categoryTitle
    })
    var moviesUrl = "";
    switch (categoryTitle) {
      case "正在热映":
          moviesUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters?${app.globalData.doubanApikey}`; 
        break;
      case "即将上映":
          moviesUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon?${app.globalData.doubanApikey}`;
        break;   
      case "豆瓣Top250":
          moviesUrl =`${app.globalData.doubanBase}/v2/movie/top250?${app.globalData.doubanApikey}`; 
        break;     
    }
    util.getMoreMovies(moviesUrl, this.processDoubanData)
  },
  processDoubanData: function (moviesDouban) {
    
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    console.log('doumovies', movies)
    this.setData({
      movies: movies
    });
    // var totalMovies = {}

    // //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    // if (!this.data.isEmpty) {
    //   totalMovies = this.data.movies.concat(movies);
    // }
    // else {
    //   totalMovies = movies;
    //   this.data.isEmpty = false;
    // }
    // this.setData({
    //   movies: totalMovies
    // });

    // this.data.totalCount += 20;
    // wx.hideNavigationBarLoading();
    // wx.stopPullDownRefresh()
  },
  onScrollLower: function () {
    const nextUrl = ""
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})