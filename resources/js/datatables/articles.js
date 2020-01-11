import 'datatables.net-fixedcolumns-bs4'
import axios from 'axios'

import User from './../class/User'
import { generateCustomSearch } from './../components/datatable-searchbox'
import { generateButtonSpinner } from './../components/button-spinner'
import { generateUserProfileDetail, hideSecondaryModal } from '../components/modals/index'
import { uploadProfilePhoto, saveProfilePhoto, processPhotoUploading } from './../components/photo-uploader'
import { addError, removeError } from './../components/input-field'
import { generateAdminRole, generateUserRole } from './../components/role'

$(function() {
  generateCustomSearch('#articles-table_filter')
})

// Generate Datatables
let articlesTable = $('#articles-table').DataTable({
  serverSide: false,
  processing: true,
  ajax: '/data/articles.json',
  scrollX: true,
  drawCallback: function(settings) {
    console.log('Data refreshed...')
  },
  order: [],

  columns: [
    {
      orderable: false,
      sortable: false,
      render: function() {
        return ''
      },
    },
    {
      data: 'title',
      name: 'title',
      className: 'table-article-title',
      orderData: [0, 1],
      render: function(data, type, full, meta) {
        let admin = full.author.role === 'admin'
        let cover = `/media/user-${full.author.id}/${full.cover.src}` || 'default.png'
        let fullData = JSON.stringify(full)
        if (type === 'sort') {
          return data
        } else {
          return `
            <div class="article-info">
              <textarea class="hidden">${fullData}</textarea>
              <div class="profile-thumbnail lazyload-bg" style="background-image: url('${cover}'), linear-gradient(to top, #008384, #008384);"></div>
              <span class="user-data">
                <div class="heading4 user-main-info">
                  ${full.title} <span class="user-info-id">(<span class="id-pound">#</span>${full.id})</span>
                  ${admin ? '<span class="user-role">admin</span>' : ''}
                </div>
                <span class="medium" style="color: #767676;">
                  ${full.author.email}
                  <span style="padding: 0px 4px;">•</span>
                  ${full.author.phone}
                </span>
              </span>
            </div>
          `
        }
      },
    },
    {
      data: 'author',
      name: 'author',
      className: 'table-author',
      render: function(data, type, full, meta) {
        return data.name
      },
    },
    { data: 'submitted_at', name: 'submitted_at', className: 'table-user-area' },
  ],
  language: {
    processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>',
  },
  pageLength: 25,
  dom: '<"table-footer-info"  i <".separator"> l>frt<"#tableFooter.datatable-footer" p>',
})

articlesTable
  .on('order.dt search.dt', function() {
    articlesTable
      .column(0, { search: 'applied', order: 'applied' })
      .nodes()
      .each(function(cell, i) {
        cell.innerHTML = i + 1
      })
  })
  .draw()
