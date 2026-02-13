import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { applicationsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Building2, MapPin, Calendar, DollarSign, MoreVertical, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

const KanbanBoard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'applied', title: 'Applied', color: 'bg-blue-500' },
    { id: 'interview', title: 'Interview', color: 'bg-yellow-500' },
    { id: 'offer', title: 'Offer', color: 'bg-green-500' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-500' }
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getAll({ limit: 100 });
      setApplications(response.data.applications);
    } catch (error) {
      toast.error('Failed to load applications');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;

    try {
      // Update backend
      await applicationsAPI.updateStatus(draggableId, { status: newStatus });

      // Update local state
      setApplications(prev =>
        prev.map(app =>
          app._id === draggableId ? { ...app, status: newStatus } : app
        )
      );

      toast.success('Application status updated');
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const getApplicationsByStatus = (status) => {
    return applications.filter(app => app.status === status);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationsAPI.delete(id);
        setApplications(prev => prev.filter(app => app._id !== id));
        toast.success('Application deleted');
      } catch (error) {
        toast.error('Failed to delete application');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
              </div>
              <span className="text-sm text-gray-500">
                {getApplicationsByStatus(column.id).length}
              </span>
            </div>

            {/* Droppable Column */}
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[500px] space-y-3 ${
                    snapshot.isDraggingOver ? 'bg-primary-50' : ''
                  } rounded-lg p-2 transition-colors`}
                >
                  {getApplicationsByStatus(column.id).map((app, index) => (
                    <Draggable key={app._id} draggableId={app._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 ${
                            snapshot.isDragging ? 'shadow-lg ring-2 ring-primary-500' : ''
                          } transition-shadow cursor-move`}
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                {app.position}
                              </h4>
                              <div className="flex items-center text-xs text-gray-600 space-x-1">
                                <Building2 className="h-3 w-3" />
                                <span>{app.company}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDelete(app._id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Card Details */}
                          <div className="space-y-2">
                            {app.location && (
                              <div className="flex items-center text-xs text-gray-500 space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{app.location}</span>
                              </div>
                            )}

                            {app.applicationDate && (
                              <div className="flex items-center text-xs text-gray-500 space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{format(new Date(app.applicationDate), 'MMM dd, yyyy')}</span>
                              </div>
                            )}

                            {app.salary?.min && (
                              <div className="flex items-center text-xs text-gray-500 space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>
                                  ${app.salary.min.toLocaleString()} - ${app.salary.max?.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          {app.tags && app.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {app.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {app.tags.length > 2 && (
                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                  +{app.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Priority Badge */}
                          {app.priority && app.priority !== 'medium' && (
                            <div className="mt-2">
                              <span
                                className={`px-2 py-0.5 text-xs rounded ${
                                  app.priority === 'high'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {app.priority} priority
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  {getApplicationsByStatus(column.id).length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No applications
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
