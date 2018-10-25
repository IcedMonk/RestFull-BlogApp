<% include ./partials/header %>


<div class="ui main container segment">
  <div class="ui huge header"><%= view.title%></div>
  <div class="ui top attached">
    <div class="item">
      <img class="ui centered rounded image" src="<%=view.image%>">
      <div class="content">
        <span><%= view.created.toDateString() %></span>
      </div>
      <div class="description">
        <p> <%=view.discription%> </p>
      </div>
      <a class="ui orange basic button" href="/blogs/<%=view._id%>/edit">Edit</a>
      <form  id="delete" action="/blogs/<%=view._id%>?_method=DELETE" method="post">
        <button class="ui red basic button">Delete</button>
      </form>
    </div>
  </div>
</div>



<% include ./partials/footer %>
